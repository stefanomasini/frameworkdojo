define(['libreact', 'jquery', 'jsx!react/view/tree', 'nodes'], function (React, $, treeViewMod, nodesMod) {
    'use strict';

    var TreeLevel = treeViewMod.TreeLevel;

    var DojoApp = React.createClass({
        render: function () {
            return (
                <div>
                    <p>A hierarchy of nodes:</p>
                    <TreeLevel nodes={this.props.nodesStorage.getRootNodes()} nodesStorage={this.props.nodesStorage}/>
                </div>
            );
        }
    });

    var Footer = React.createClass({
        getInitialState: function() {
            return {
                serverActivity: false
            };
        },
        setBusy: function (status) {
            this.setState({serverActivity: status});
        },
        render: function () {
            return (
                <div className="container">
                    {this.state.serverActivity
                        ? <p className="text-muted credit">Server busy...</p>
                        : ''}
                </div>
            );
        }
    });

    var footer = <Footer nodesStorage={nodesStorage}/>;

    var nodesStorage = new nodesMod.NodesStorage({
        serverMonitor: footer
    });

    React.renderComponent(footer, $('#footer')[0]);

    React.renderComponent(<DojoApp nodesStorage={nodesStorage}/>, $('.main-page-container')[0]);

});
