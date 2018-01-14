import chai           from 'chai';
import sinon          from 'sinon';
import sinonChai      from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import mockery        from 'mockery';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();


const moduleUnderTest = '../../server/db.js';

let mongodbMock = {};
let moduleInstance;

describe('openExchange', () => {
    beforeEach(() => {
        console.log('asd');
        mockery.registerAllowable(moduleUnderTest);
        mockery.registerMock('mongodb', mongodbMock);
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false,
        });

        mongodbMock.MongoClient = {
            connect: (url, fn) => {
                fn(undefined, {
                    db: () => ({ collection: () => mongodbMock.collection }),
                    close: () => {},
                });
            },
        };
        mongodbMock.ObjectID = () => {};

        const BD = require(moduleUnderTest).default;
        moduleInstance = new BD();


    });

    afterEach(function() {
        mockery.disable();
        mockery.deregisterAll();
    });

    describe('#insert', () => {
        it('returns currencies with API request', async () => {
        });
    });

    describe('#getHistorical', () => {
        it('returns request', async () => {
        });

        it('returns Error with undefined date parameter', async () => {
        });
    });
});
