import { Component } from "react";
import PageLoader from "./PageLoader.jsx";

export default class SkeletonErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, attempt: 0 };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Pixel Players: page failed to render.", error, info);
  }

  handleRetry = () => {
    this.setState((prev) => ({ error: null, attempt: prev.attempt + 1 }));
  };

  render() {
    const { error } = this.state;
    if (!error) {
      return this.props.children;
    }
    return (
      <PageLoader
        status="error"
        onRetry={this.handleRetry}
      />
    );
  }
}