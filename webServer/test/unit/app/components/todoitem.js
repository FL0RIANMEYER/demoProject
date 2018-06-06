import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import TodoItem from '../../../../app/components/todo/TodoItem';
import TodoTextInput from '../../../../app/components/todo/TodoTextInput';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = ( editing = false ) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false,
    },
    editTodo: sinon.spy(),
    deleteTodo: sinon.spy(),
    completeTodo: sinon.spy(),
  };

  const renderer = createRenderer();

  renderer.render(
    <TodoItem {...props} />
  );

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
};

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { output } = setup();

      expect(output.type).to.be.equal('li');
      expect(output.props.className).to.be.equal('');

      const div = output.props.children;

      expect(div.type).to.be.equal('div');
      expect(div.props.className).to.be.equal('view');

      const [input, label, button] = div.props.children;

      expect(input.type).to.be.equal('input');
      expect(input.props.checked).to.be.equal(false);

      expect(label.type).to.be.equal('label');
      expect(label.props.children).to.be.equal('Use Redux');

      expect(button.type).to.be.equal('button');
      expect(button.props.className).to.be.equal('destroy');
    });

    it('input onChange should call completeTodo', () => {
      const { output, props } = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.completeTodo).have.been.calledWith(0);
    });

    it('button onClick should call deleteTodo', () => {
      const { output, props } = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteTodo).have.been.calledWith(0);
    });

    it('label onDoubleClick should put component in edit state', () => {
      const { output, renderer } = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).to.be.equal('li');
      expect(updated.props.className).to.be.equal('editing');
    });

    it('edit state render', () => {
      const { output } = setup(true);

      expect(output.type).to.be.equal('li');
      expect(output.props.className).to.be.equal('editing');

      const input = output.props.children;
      expect(input.type).to.be.equal(TodoTextInput);
      expect(input.props.text).to.be.equal('Use Redux');
      expect(input.props.editing).to.be.equal(true);
    });

    it('TodoTextInput onSave should call editTodo', () => {
      const { output, props } = setup(true);
      output.props.children.props.onSave('Use Redux');
      expect(props.editTodo).have.been.calledWith(0, 'Use Redux');
    });

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      const { output, props } = setup(true);
      output.props.children.props.onSave('');
      expect(props.deleteTodo).have.been.calledWith(0);
    });

    it('TodoTextInput onSave should exit component from edit state', () => {
      const { output, renderer } = setup(true);
      output.props.children.props.onSave('Use Redux');
      const updated = renderer.getRenderOutput();
      expect(updated.type).to.be.equal('li');
      expect(updated.props.className).to.be.equal('');
    });
  });
});
