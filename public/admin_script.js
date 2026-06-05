import { auth, signInWithGoogle as firebaseSignIn, logOut } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// ── Globals ──────────────────────────────────────────────
let gToken = null;
let gProducts = [];
let gOrders = [];

// ── Auth Fetch with Auto-Renew ───────────────────────────
async function authFetch(url, options = {}) {
  if (auth.currentUser) {
    try {
      gToken = await auth.currentUser.getIdToken();
    } catch (e) {
      console.warn("Auto-token check failed:", e);
    }
  }
  if (!options.headers) {
    options.headers = {};
  }
  if (gToken) {
    options.headers["Authorization"] = "Bearer " + gToken;
  }
  let res = await fetch(url, options);
  
  if (res.status === 401 && auth.currentUser) {
    console.log("Admin token expired. Forcing live token refresh...");
    try {
      gToken = await auth.currentUser.getIdToken(true);
      options.headers["Authorization"] = "Bearer " + gToken;
      res = await fetch(url, options);
    } catch (err) {
      console.error("Auto token renewal failed:", err);
    }
  }
  return res;
}

// ── Auth helpers ──────────────────────────────────────────────
async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken(true);
}

window.adminEmailLogin = async function () {
  const errEl = document.getElementById("auth-gate-error");
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;
  
  if (!email || !password) {
    if (errEl) errEl.textContent = "Please enter email and password.";
    return;
  }
  
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const token = await user.getIdToken();
    gToken = token;
    const res = await authFetch("/api/admin/summary");
    if (!res.ok) {
      const data = await res.json();
      if (errEl) errEl.textContent = data.error || "Access denied. Not an admin account.";
      await logOut();
      return;
    }
    document.getElementById("auth-gate").classList.add("hidden");
    updateAdminUI(user);
    gToken = token;
    loadAllData();
    toast("Welcome, " + (user.displayName || user.email));
  } catch (err) {
    if (errEl) errEl.textContent = err.message || "Login failed.";
  }
};

window.adminGoogleLogin = async function () {
  const errEl = document.getElementById("auth-gate-error");
  try {
    const { user } = await firebaseSignIn();
    const token = await user.getIdToken();
    gToken = token;
    const res = await authFetch("/api/admin/summary");
    if (!res.ok) {
      const data = await res.json();
      if (errEl) errEl.textContent = data.error || "Access denied. Not an admin account.";
      await logOut();
      return;
    }
    document.getElementById("auth-gate").classList.add("hidden");
    updateAdminUI(user);
    gToken = token;
    loadAllData();
    toast("Welcome, " + (user.displayName || user.email));
  } catch (err) {
    if (errEl) errEl.textContent = err.message || "Login failed.";
  }
};

window.adminLogout = async function() {
  await logOut();
  window.location.reload();
};

function updateAdminUI(user) {
  const nameEl = document.querySelector("#sidebar [style*='font-size:13px']");
  const roleEl = document.querySelector("#sidebar [style*='font-size:11px']");
  const avatarEl = document.querySelector("#sidebar .avatar");
  if (nameEl) nameEl.textContent = user.displayName || user.email;
  if (roleEl) roleEl.textContent = "Admin";
  if (user.photoURL && avatarEl) avatarEl.innerHTML = `<img src="${user.photoURL}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
  
  // Fill profile fields
  const inputs = document.querySelectorAll("#s-account .inp");
  if (inputs.length >= 3) {
    const names = (user.displayName || "").split(" ");
    inputs[0].value = names[0] || "";
    inputs[1].value = names.slice(1).join(" ") || "";
    inputs[2].value = user.email || "";
  }
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    gToken = token;
    const res = await authFetch("/api/admin/summary");
    if (res.ok) {
      document.getElementById("auth-gate").classList.add("hidden");
      updateAdminUI(user);
      gToken = token;
      loadAllData();
    } else {
      await logOut();
    }
  }
});

function loadAllData() {
  loadDashboardData();
  loadProductsData();
  loadCustomersData();
  loadSettingsData();
}

// ── Dashboard / Orders ──────────────────────────────────
async function loadDashboardData() {
  try {
    const res = await authFetch("/api/orders");
    if (!res.ok) return;
    const orders = await res.json();
    gOrders = orders;

    const totalRevenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const pending = orders.filter(o => o.status === "Pending").length;
    const inTransit = orders.filter(o => o.status === "In Transit").length;
    const activeOrders = pending + inTransit;
    const avgOrderVal = orders.length ? Math.round(totalRevenue / orders.length) : 0;
    const uniqueCustomers = new Set(orders.map(o => o.phone || o.customerName)).size;

    const metricCards = document.querySelectorAll(".metric-card .font-serif");
    if (metricCards[0]) metricCards[0].textContent = "৳ " + totalRevenue.toLocaleString("bn-BD");
    if (metricCards[1]) metricCards[1].textContent = activeOrders;
    if (metricCards[2]) metricCards[2].textContent = uniqueCustomers.toLocaleString("bn-BD");
    if (metricCards[3]) metricCards[3].textContent = "৳ " + avgOrderVal.toLocaleString("bn-BD");

    const subEl = document.querySelectorAll(".metric-card div");
    subEl.forEach(el => {
      if (el.textContent.includes("pending") || el.textContent.includes("transit")) {
        el.textContent = `${pending} pending, ${inTransit} in transit`;
      }
    });

    renderOrdersTable(orders.slice(0, 6), "recent-orders-tbody");
    renderOrdersTable(orders, "all-orders-tbody");

    const allBtn = document.querySelector("#s-orders .btn-primary");
    if (allBtn) allBtn.textContent = `All (${orders.length})`;

  } catch (err) {
    console.warn("Could not load orders:", err.message);
  }
}

function statusBadge(status) {
  const map = {
    "Pending": "badge-amber",
    "In Transit": "badge-blue",
    "Delivered": "badge-green",
    "Cancelled": "badge-red"
  };
  const cls = map[status] || "badge-gray";
  const style = cls === "badge-blue" ? "background:#e3f2ff;color:#1565c0;" : "";
  return `<span class="badge ${cls}" style="${style}">${status}</span>`;
}

function renderOrdersTable(orders, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:#73796f;">No orders yet</td></tr>`;
    return;
  }
  tbody.innerHTML = orders.map(o => {
    const date = o.createdAt ? new Date(o.createdAt._seconds * 1000).toLocaleDateString("en-GB", {day:"2-digit",month:"short",year:"numeric"}) : "—";
    const itemNames = Array.isArray(o.items) ? o.items.map(i => i.name).join(", ").substring(0, 30) + "..." : "—";
    
    // Status dropdown logic for all-orders-tbody
    let statusCol = statusBadge(o.status || "Pending");
    if (tbodyId === "all-orders-tbody") {
      statusCol = `
        <select class="inp" style="padding:4px 8px;font-size:12px;width:110px;" onchange="updateOrderStatus('${o.id}', this.value)">
          <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Transit" ${o.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      `;
    }

    return `<tr>
      <td><input type="checkbox" style="accent-color:#0f3310;"/></td>
      <td style="font-weight:600;">${o.orderId || o.id || "—"}</td>
      <td><div><div style="font-weight:600;">${o.customerName || "—"}</div><div style="font-size:11px;color:#73796f;">${o.city || ""}</div></div></td>
      <td>${itemNames}</td>
      <td><span class="badge badge-gray">${o.payment || "cod"}</span></td>
      <td>${statusCol}</td>
      <td style="color:#73796f;white-space:nowrap;">${date}</td>
      <td style="text-align:right;font-weight:600;">৳ ${(Number(o.total)||0).toLocaleString("bn-BD")}</td>
    </tr>`;
  }).join("");
}

window.updateOrderStatus = async function(id, newStatus) {
  try {
    const res = await authFetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      toast("Order status updated!");
      loadDashboardData();
    } else {
      toast("Failed to update status");
    }
  } catch (err) {
    toast("Error updating status");
  }
};

// ── Products ──────────────────────────────────────────────
async function loadProductsData() {
  try {
    const res = await authFetch("/api/products");
    if (!res.ok) return;
    const products = await res.json();
    gProducts = products;

    const pMetricCards = document.querySelectorAll("#s-products .metric-card .font-serif");
    if (pMetricCards[1]) pMetricCards[1].textContent = products.length + " টি";
    
    const tbody = document.getElementById("products-tbody");
    if (!tbody) return;

    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:30px;color:#73796f;">কোনো পণ্য নেই।</td></tr>`;
      return;
    }

    let html = "";
    products.forEach(p => {
      const stockBadge = p.inStock !== false ? '<span class="badge badge-green">In Stock</span>' : '<span class="badge badge-red">Out of Stock</span>';
      html += `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="${p.image || p.imageUrl || ''}" style="width:44px;height:44px;border-radius:8px;object-fit:cover;background:#f5ece5;" alt="Img">
              <div>
                <div style="font-weight:600;">${p.name || p.title || 'Unknown'}</div>
                <div style="font-size:11px;color:#73796f;">${p.brand || 'PureOrigins'}</div>
              </div>
            </div>
          </td>
          <td style="font-weight:600;">৳ ${p.price || 0}</td>
          <td>${stockBadge}</td>
          <td><span class="badge" style="background:#f5ece5;color:#73796f;">${p.category || p.cat || 'অন্যান্য'}</span></td>
          <td style="text-align:right;">
            <div style="display:flex;justify-content:flex-end;gap:6px;">
              <button class="btn-ghost" style="padding:6px;" title="Edit" onclick="editProduct('${p.id}')"><span class="mat-icon">edit</span></button>
              <button class="btn-ghost" style="padding:6px;color:#ba1a1a;" title="Delete" onclick="deleteProduct('${p.id}')"><span class="mat-icon">delete</span></button>
            </div>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  } catch (err) {
    console.warn("Could not load products:", err.message);
  }
}

window.deleteProduct = async function(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    const res = await authFetch(`/api/products/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      toast("Product deleted");
      loadProductsData();
    }
  } catch(e) {}
}

window.editProduct = async function(id) {
  const p = gProducts.find(x => x.id === id);
  if (!p) return;
  const newPrice = prompt("Enter new price for " + (p.name || p.title), p.price);
  if (newPrice) {
    try {
      const res = await authFetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: Number(newPrice) })
      });
      if (res.ok) {
        toast("Product updated");
        loadProductsData();
      }
    } catch(e) {}
  }
}

// ── Customers ──────────────────────────────────────────────
async function loadCustomersData() {
  try {
    const res = await authFetch("/api/customers");
    if (!res.ok) return;
    const customers = await res.json();
    
    // Find the tbody inside #s-customers
    const tbody = document.querySelector("#s-customers tbody");
    if (!tbody) return;

    if (customers.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#73796f;">কোনো গ্রাহক নেই।</td></tr>`;
      return;
    }

    tbody.innerHTML = customers.map(c => {
      const date = c.registeredAt ? new Date(c.registeredAt._seconds * 1000).toLocaleDateString("en-GB", {month:"short",year:"numeric"}) : "—";
      return `<tr>
        <td><div><div style="font-weight:600;">${c.name}</div><div style="font-size:11px;color:#73796f;">${c.email || c.phone}</div></div></td>
        <td style="color:#73796f;">${c.phone}</td>
        <td style="font-weight:600;">${c.totalOrders || 0}</td>
        <td style="font-weight:600;color:#0f3310;">৳ ${(Number(c.totalSpent)||0).toLocaleString("bn-BD")}</td>
        <td>${c.city || "—"}</td>
        <td style="color:#73796f;">${date}</td>
      </tr>`;
    }).join("");
  } catch(e) {}
}

// ── Settings ──────────────────────────────────────────────
async function loadSettingsData() {
  try {
    const res = await authFetch("/api/settings");
    if (!res.ok) return;
    const settings = await res.json();
    
    // Populate General
    const gInputs = document.querySelectorAll("#tab-general .inp");
    if (gInputs.length >= 6) {
      gInputs[0].value = settings.storeName || "";
      gInputs[1].value = settings.supportEmail || "";
      gInputs[2].value = settings.contactPhone || "";
      gInputs[3].value = settings.currency || "BDT";
      gInputs[4].value = settings.physicalAddress || "";
      gInputs[5].value = settings.storeLogo || "";
    }

    // Populate Shipping
    const sInputs = document.querySelectorAll("#tab-shipping .inp");
    if (sInputs.length >= 4) {
      sInputs[0].value = settings.shipping?.insideDhaka?.charge || 60;
      sInputs[1].value = settings.shipping?.insideDhaka?.estimatedTime || "1-2 Days";
      sInputs[2].value = settings.shipping?.outsideDhaka?.charge || 120;
      sInputs[3].value = settings.shipping?.outsideDhaka?.estimatedTime || "3-5 Days";
    }

  } catch(e) {}
}

window.toastTm = null;
window.toast = function(msg, icon) {
  const t = document.getElementById("toast");
  const m = document.getElementById("toast-msg");
  const i = t ? t.querySelector(".mat-icon") : null;
  if (!t) return;
  if (m) m.textContent = msg;
  if (i && icon) i.textContent = icon;
  t.classList.add("show");
  clearTimeout(window.toastTm);
  window.toastTm = setTimeout(() => t.classList.remove("show"), 3000);
}

window.switchScreen = function(id, el) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const scr = document.getElementById("s-" + id);
  if (scr) scr.classList.add("active");
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  if (el) el.classList.add("active");
}

window.switchTab = function(btn, tabId) {
  document.querySelectorAll(".settings-tab").forEach(b => {
    b.classList.remove("active");
    b.classList.add("bg-white", "text-muted", "border");
    b.classList.remove("bg-primary", "text-white");
  });
  document.querySelectorAll(".settings-panel").forEach(p => {
    p.style.display = "none";
  });
  
  btn.classList.add("active");
  btn.classList.remove("bg-white", "text-muted", "border");
  btn.classList.add("bg-primary", "text-white");
  
  const panel = document.getElementById(tabId);
  if (panel) panel.style.display = "block";
};

window.toggleAddProductForm = function() {
  const form = document.getElementById("add-product-form");
  if (form) form.classList.toggle("hidden");
};

window.submitNewProduct = async function() {
  const name = document.getElementById("p-name").value.trim();
  const price = Number(document.getElementById("p-price").value) || 0;
  const category = document.getElementById("p-category").value.trim();
  const image = document.getElementById("p-image").value.trim();
  const unit = document.getElementById("p-unit").value.trim();
  const tag = document.getElementById("p-tag").value.trim();

  if (!name || price <= 0 || !category) {
    alert("Please fill name, positive price, and category.");
    return;
  }

  const payload = {
    name,
    price,
    category,
    image,
    unit,
    tag,
    inStock: true,
    description: "",
    benefits: []
  };

  try {
    const res = await authFetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      toast("Product added successfully!");
      toggleAddProductForm();
      // Clear inputs
      document.getElementById("p-name").value = "";
      document.getElementById("p-price").value = "";
      document.getElementById("p-category").value = "";
      document.getElementById("p-image").value = "";
      document.getElementById("p-unit").value = "";
      document.getElementById("p-tag").value = "";
      loadProductsData();
    } else {
      const err = await res.json();
      alert("Error adding product: " + (err.error || "Unknown"));
    }
  } catch (e) {
    alert("Network error adding product");
  }
};

window.saveSettingsData = async function() {
  const gInputs = document.querySelectorAll("#tab-general .inp");
  const sInputs = document.querySelectorAll("#tab-shipping .inp");
  
  const payload = {
    storeName: gInputs[0]?.value || "",
    supportEmail: gInputs[1]?.value || "",
    contactPhone: gInputs[2]?.value || "",
    currency: gInputs[3]?.value || "BDT",
    physicalAddress: gInputs[4]?.value || "",
    storeLogo: gInputs[5]?.value || "",
    shipping: {
      insideDhaka: {
        charge: Number(sInputs[0]?.value) || 0,
        estimatedTime: sInputs[1]?.value || ""
      },
      outsideDhaka: {
        charge: Number(sInputs[2]?.value) || 0,
        estimatedTime: sInputs[3]?.value || ""
      }
    }
  };

  try {
    const res = await authFetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      toast("Settings saved successfully!");
      loadSettingsData();
    } else {
      const err = await res.json();
      toast("Error saving settings: " + (err.error || "Unknown"));
    }
  } catch (e) {
    toast("Network error saving settings");
  }
};
