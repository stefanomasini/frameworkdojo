define(['libreact'], function (React) {
    'use strict';

    var TreeNode = React.createClass({
        getInitialState: function() {
            return {
                expanded: 'no'
            };
        },
        render: function () {
            var innerLevel = '';
            var symbol;
            if (this.state.expanded === 'yes') {
                symbol = 'V ';
                innerLevel = <TreeLevel nodes={this.childrenNodes} nodesStorage={this.props.nodesStorage}/>;
            }
            var textStyle = {};
            if (this.state.expanded === 'expanding') {
                symbol = '~ ';
                textStyle.backgroundColor = 'yellow';
                textStyle.color = 'gray';
            }
            if (this.state.expanded === 'no') {
                symbol = '> ';
            }
            if (this.props.node.file) {
                symbol = '';
                textStyle.fontWeight = 'bold';
            }
            return (
                <li className="tree-node">
                    {symbol}
                    <span onClick={this.onClick} style={textStyle}>{this.props.node.name}</span>
                    {innerLevel}
                </li>
            );
        },
        onClick: function (e) {
            e.preventDefault();
            var this_ = this;
            this_.childrenNodes = null;
            if (this.props.node.file) {

            } else {
                if (this.state.expanded !== 'no') {
                    this.setState({expanded: 'no'});
                } else if (this.state.expanded === 'no') {
                    this.setState({expanded: 'expanding'});
                    this.props.nodesStorage.fetchChildrenNodes(this.props.node)
                        .then(function (childrenNodes) {
                            if (this_.state.expanded === 'expanding') {
                                this_.childrenNodes = childrenNodes;
                                this_.setState({expanded: 'yes'});
                            }
                        });
                }
            }
        }
    });

    var TreeLevel = React.createClass({
        render: function () {
            var this_ = this;
            var createNode = function (node) {
                return <TreeNode node={node} nodesStorage={this_.props.nodesStorage}/>;
            };
            return (
                <ul>{this.props.nodes.map(createNode)}</ul>
                );
        }
    });

    return {
        TreeLevel: TreeLevel
    };
});
