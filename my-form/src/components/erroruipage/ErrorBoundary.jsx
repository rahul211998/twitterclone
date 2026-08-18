import React from "react";
import ErrorPage from "../../pages/errorpage/ErrorPage.jsx";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log("Error:", error);
        console.log("Error Info:", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;