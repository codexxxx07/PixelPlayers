import { Component } from 'react';
import ErrorState from './ErrorState';

export default class SkeletonErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (this.props.onError) this.props.onError(error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title={this.props.fallbackTitle || 'Something went wrong'}
          message={this.props.fallbackMessage}
          onRetry={this.props.onReset ? this.handleRetry : undefined}
        />
      );
    }

    return this.props.children;
  }
}