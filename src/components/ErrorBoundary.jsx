import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2>Algo salió mal</h2>
          <p style={{ margin: "8px 0 16px", color: "#6b7280" }}>
            Ocurrió un error inesperado. Recargá la página o intentá de nuevo.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "9px 18px",
              background: "#101054",
              color: "#fff",
              border: "none",
              borderRadius: 6,
            }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
