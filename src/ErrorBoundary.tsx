import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in PureOrigins UI:", error, errorInfo);
    
    // Safely extract context info preventing sandbox/iframe SecurityErrors
    let safeUrl = "";
    try {
      safeUrl = window.location.href;
    } catch (e) {
      safeUrl = "Iframe Sandbox / Hidden Url";
    }

    let safeUserAgent = "";
    try {
      safeUserAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
    } catch (e) {
      safeUserAgent = "Unknown UserAgent";
    }

    fetch("/api/health", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error?.message || String(error),
        stack: error?.stack,
        componentStack: errorInfo?.componentStack,
        url: safeUrl,
        userAgent: safeUserAgent,
        timestamp: new Date().toISOString()
      })
    }).catch((err) => {
      console.error("Failed to post error log to backend:", err);
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    try {
      window.location.reload();
    } catch (e) {
      console.error("Failed to reload via window.location.reload():", e);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
            <div className="mx-auto w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Something went wrong</h1>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              An unexpected error occurred in the PureOrigins layout. We have logged this diagnostic event.
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl text-left border border-slate-100">
                <p className="text-xs font-mono text-slate-600 font-semibold mb-1">Error Message:</p>
                <p className="text-xs font-mono text-rose-600 break-words">
                  {this.state.error.message || String(this.state.error)}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B4332] text-white rounded-full font-semibold hover:bg-[#2D6A4F] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <RotateCcw className="w-4 h-4" /> Try Reloading
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
