import React from 'react';

import 'css/tabs';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = { page: 0 };
    }
    changePage(page) {
        this.setState({ page });
    }
    renderMenu() {
        return <div className="tab-controller">
            {this.props.children.map((child, index) => 
                <div key={index} 
                     onClick={this.changePage.bind(this, index)} 
                     className={this.state.page === index ? 'selected' : ''}>
                    {child.props.label}
                </div>)}
        </div>;
    }
    renderPage() {
        return this.props.children[this.state.page];
    }
    render() {
        return <div className="tab" {...this.props}>
            {this.renderMenu()}
            {this.renderPage()}
        </div>;
    }
}

export default Tab;