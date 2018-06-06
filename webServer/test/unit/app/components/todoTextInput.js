import React from 'react';
import {createRenderer} from 'react-test-renderer/shallow';
import TodoTextInput from '../../../../app/components/todo/TodoTextInput';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = propOverrides => {
    const props = Object.assign({
        onSave: sinon.spy(),
        text: 'Use Redux',
        placeholder: 'What needs to be done?',
        editing: false,
        newTodo: false,
    }, propOverrides);

    const renderer = createRenderer();

    renderer.render(<TodoTextInput {...props}/>);

    const output = renderer.getRenderOutput();

    return { props: props, output: output, renderer: renderer };
};

describe('components', () => {
    describe('TodoTextInput', () => {
        it('should render correctly', () => {
            const {output} = setup();

            expect(output.props.placeholder).to.be.equal('What needs to be done?');
            expect(output.props.value).to.be.equal('Use Redux');
        });

        it('should render correctly when editing=true', () => {
            const {output} = setup({ editing: true });

            expect(output.props.className).to.be.equal('edit');
        });

        it('should render correctly when newTodo=true', () => {
            const {output} = setup({newTodo: true});
            expect(output.props.className).to.be.equal('newTodo');
        });

        it('should update value on change', () => {
            const {output, renderer} = setup();

            output.props.onChange({
                target: {
                    value: 'Use Radox',
                },
            });
            const updated = renderer.getRenderOutput();

            expect(updated.props.value).to.be.equal('Use Radox');
        });

        it('should call onSave on return key press', () => {
            const {output, props} = setup();

            output.props.onKeyDown({
                which: 13,
                target: {
                    value: 'Use Redux',
                },
            });

            expect(props.onSave).have.been.calledWith('Use Redux');
        });

        it('should reset state on return key press if newTodo', () => {
            const {output, renderer} = setup({newTodo: true});

            output.props.onKeyDown({
                which: 13,
                target: {
                    value: 'Use Redux',
                },
            });
            const updated = renderer.getRenderOutput();

            expect(updated.props.value).to.be.equal('');
        });

        it('should call onSave on blur', () => {
            const {output, props} = setup();

            output.props.onBlur({
                target: {
                    value: 'Use Redux',
                },
            });

            expect(props.onSave).have.been.calledWith('Use Redux');
        });

        it('shouldnt call onSave on blur if newTodo', () => {
            const {output, props} = setup({newTodo: true});

            output.props.onBlur({
                target: {
                    value: 'Use Redux',
                },
            });

            expect(props.onSave).have.not.been.called;
        });
    });
});
