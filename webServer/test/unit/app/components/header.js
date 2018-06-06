import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Header } from '../../../../app/components/header';
import TodoTextInput from '../../../../app/components/todo/TodoTextInput';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = () => {
  const props = {
    addTodo: sinon.spy(),
  };

  const renderer = createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
};

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.type).to.be.equal('header');
      expect(output.props.className).to.be.equal('header');

      const [h1, input] = output.props.children;
      expect(h1.type).to.be.equal('h1');
      expect(h1.props.children).to.be.equal('todos');
      expect(input.type).to.be.equal(TodoTextInput);
      expect(input.props.newTodo).to.be.equal(true);
      expect(input.props.placeholder).to.be.equal('What needs to be done?');
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.addTodo).have.not.been.called;
      input.props.onSave('Use Redux');
      expect(props.addTodo).have.been.called;
    });
  });
});
