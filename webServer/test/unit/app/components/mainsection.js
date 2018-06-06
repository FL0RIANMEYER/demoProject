import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import MainSection from '../../../../app/components/mainsection';
import Footer from '../../../../app/components/footer';
import VisibleTodoList from '../../../../app/container/visibletodolist';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = propOverrides => {
  const props = Object.assign({
    todosCount: 2,
    completedCount: 1,
    actions: {
      editTodo: sinon.spy(),
      deleteTodo: sinon.spy(),
      completeTodo: sinon.spy(),
      completeAllTodos: sinon.spy(),
      clearCompleted: sinon.spy(),
    },
  }, propOverrides);

  const renderer = createRenderer();
  renderer.render(<MainSection {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
};

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).to.be.equal('section');
      expect(output.props.className).to.be.equal('main');
    });

    describe('toggle all input', () => {
      it('should render', () => {
        const { output } = setup();
        const [toggle] = output.props.children[0].props.children;
        expect(toggle.type).to.be.equal('input');
        expect(toggle.props.className).to.be.equal('toggleAll');
        expect(toggle.props.type).to.be.equal('checkbox');
        expect(toggle.props.defaultChecked).to.be.equal(false);
      });

      it('should be checked if all todos completed', () => {
        const { output } = setup({
          completedCount: 2,
        });
        const [toggle] = output.props.children[0].props.children;
        expect(toggle.props.defaultChecked).to.be.equal(true);
      });

      it('should call completeAllTodos on change', () => {
        const { output, props } = setup();
        const [, label] = output.props.children[0].props.children;
        label.props.onClick({});
        expect(props.actions.completeAllTodos).have.been.called;
      });
    });

    describe('footer', () => {
      it('should render', () => {
        const { output } = setup();
        const [, , footer] = output.props.children;
        expect(footer.type).to.be.equal(Footer);
        expect(footer.props.completedCount).to.be.equal(1);
        expect(footer.props.activeCount).to.be.equal(1);
      });

      it('onClearCompleted should call clearCompleted', () => {
        const { output, props } = setup();
        const [, , footer] = output.props.children;
        footer.props.onClearCompleted();
        expect(props.actions.clearCompleted).have.been.called;
      });
    });

    describe('toggle all input and footer', () => {
      it('should not render if there are no todos', () => {
        const { output } = setup({
          todosCount: 0,
          completedCount: 0,
        });
        const renderedChildren = output.props.children
        .filter((item) => item !== false);
        expect(renderedChildren.length).to.be.equal(1);
      });
    });
  });
});
