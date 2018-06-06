import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Footer from '../../../../app/components/footer';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../../../app/constants/TodoFilters';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = propOverrides => {
  const props = Object.assign({
    completedCount: 0,
    activeCount: 0,
    onClearCompleted: sinon.spy(),
  }, propOverrides);

  const renderer = createRenderer();
  renderer.render(<Footer {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

const getTextContent = elem => {
  const children = Array.isArray(elem.props.children) ?
    elem.props.children : [elem.props.children];

  return children.reduce((out, child) =>
    // Concatenate the text
    // Children are either elements or text strings
    out + (child.props ? getTextContent(child) : child)
  , '');
};

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).to.be.equal('footer');
      expect(output.props.className).to.be.equal('footer');
    });

    it('should display active count when 0', () => {
      const { output } = setup({ activeCount: 0 });
      const [count] = output.props.children;
      expect(getTextContent(count)).to.be.equal('No items left');
    });

    it('should display active count when above 0', () => {
      const { output } = setup({ activeCount: 1 });
      const [count] = output.props.children;
      expect(getTextContent(count)).to.be.equal('1 item left');
    });

    it('should render filters', () => {
      const todoFilters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
      const filterTitles = ['All', 'Active', 'Completed'];
      const { output } = setup();
      const [, filters] = output.props.children;
      expect(filters.type).to.be.equal('ul');
      expect(filters.props.className).to.be.equal('filters');
      expect(filters.props.children.length).to.be.equal(3);
      filters.props.children.forEach(function checkFilter(filter, i) {
        expect(filter.type).to.be.equal('li');
        const a = filter.props.children;
        expect(a.props.filter).to.be.equal(todoFilters[i]);
        expect(a.props.children).to.be.equal(filterTitles[i]);
      });
    });

    it('shouldnt show clear button when no completed todos', () => {
      const { output } = setup({ completedCount: 0 });
      const [, , clear] = output.props.children;
      expect(clear).to.be.equal(false);
    });

    it('should render clear button when completed todos', () => {
      const { output } = setup({ completedCount: 1 });
      const [, , clear] = output.props.children;
      expect(clear.type).to.be.equal('button');
      expect(clear.props.className).to.be.equal('clearCompleted');
      expect(clear.props.children).to.be.equal('Clear completed');
    });

    it('should call onClearCompleted on clear button click', () => {
      const { output, props } = setup({ completedCount: 1 });
      const [, , clear] = output.props.children;
      clear.props.onClick({});
      expect(props.onClearCompleted).have.been.called;
    });
  });
});
