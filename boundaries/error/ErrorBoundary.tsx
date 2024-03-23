import React from 'react';

type props = {
    fallback: string;
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<props> {

    state = { hasError: false };

    static getDerivedStateFromError(error: Error){
        return { hasError: true }
    }
    
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo)   
    }

    render(): React.ReactNode {
        if(this.state.hasError){
            return this.props.fallback
        }

        return this.props.children
    }

}

export default ErrorBoundary;