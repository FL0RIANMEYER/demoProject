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
            const insertHandler = sinon.spy((...args) => args[2]());
            const task = { task: '1234' };

            mongodbMock.collection = {
                insert: insertHandler,
            };

            const response = await moduleInstance.insert(task);

            insertHandler.should.be.calledOnce;
            insertHandler.should.have.been.calledWith({ todo: task }, sinon.match.any, sinon.match.any, );
        });
    });

    describe('#getHistorical', () => {
        it('returns request', async () => {
            // const date = '2009-12-09';
            // const responseData = { 'AED': 'United Arab Emirates Dirham' };
            // const setValueHandler = sinon.spy((key) => responseData);
            // const requestsHandler = sinon.spy((key) => responseData);
            //
            //
            // servicesMock.memCache.setValue = setValueHandler;
            // servicesMock.request           = requestsHandler;
            //
            //
            // const response = await openExachnge.getHistorical(date);
            //
            //
            // setValueHandler.should.be.calledOnce;
            // requestsHandler.should.be.calledOnce;
            // response.should.be.deep.equal(responseData);
            throw new Error('Test Error');
        });

        it('returns Error with undefined date parameter', async () => {
            // const setValueHandler = sinon.spy();
            // const requestsHandler = sinon.spy();
            //
            //
            // servicesMock.memCache.setValue = setValueHandler;
            // servicesMock.request           = requestsHandler;
            //
            //
            // setValueHandler.should.not.be.called;
            // requestsHandler.should.not.be.called;
            // openExachnge.getHistorical().should.be.rejected;
        });
    });
});
