import React from 'react';
import {createRenderer} from 'react-test-renderer/shallow';
import Link from '../../../../app/components/link';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = (propOverrides) => {
    const props = Object.assign({
        active: false,
        children: 'All',
        setFilter: sinon.spy(),
    }, propOverrides);

    const renderer = createRenderer();
    renderer.render(<Link {...props}/>);
    const output = renderer.getRenderOutput();

    console.log('absasssssssasd');

    return {props: props, output: output};
};

describe('component', () => {
    describe('Link', () => {
        it('should render correctly', () => {
            const {output} = setup();
            expect(output.type).to.be.equal('a');
            expect(output.props.style.cursor).to.be.equal('pointer');
            expect(output.props.children).to.be.equal('All');
        });

        it('should have class selected if active', () => {
            const {output} = setup({active: true});
            expect(output.props.className).to.be.equal('selected');
        });

        it('should call setFilter on click', () => {
            const {output, props} = setup();
            output.props.onClick();
            expect(props.setFilter).have.been.called;
        });
    });
});
