// Converse.js
// http://conversejs.org
//
// Copyright (c) 2013-2018, the Converse.js developers
// Licensed under the Mozilla Public License (MPLv2)

/* This is a Converse.js plugin which add support for XEP-0198: Stream Management */

(function (root, factory) {
    define(["converse-core"], factory);
}(this, function (converse, sizzle) {

    const { Strophe, $build, _ } = converse.env;
    Strophe.addNamespace('SM', 'urn:xmpp:sm:3');

    converse.plugins.add('converse-smacks', {

        initialize () {
            const { _converse } = this;

            function isStreamManagementSupported () {
                return _converse.api.disco.stream.getFeature('sm', Strophe.NS.SM);
            }

            function enable () {
                if (isStreamManagementSupported()) {

                    const stanza = $build('enable', {
                        'xmlns': Strophe.NS.SM,
                        'resume': false
                    });

                    _converse.connection.send(stanza);
                    _converse.connection.flush();
                    _converse.connection.pause();
                }
            }

            _converse.api.listen.on('streamFeaturesAdded', enable);

        }
    });

}));
