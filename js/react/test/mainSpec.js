define(['core/nodes', 'libreact'], function (nodesMod, React) {
    'use strict';

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

    describe('foo', function () {
        it('can work', function () {
            var footer = <Footer nodesStorage={nodesStorage}/>;

            var nodesStorage = new nodesMod.NodesStorage({
                serverMonitor: footer
            });

//            expect(nodesMod).not.toBeNull();
        });
    });
});
