import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from '../react-list.es6';

const renderItem = (index, key) =>
  <div key={key} className={'item' + (index % 2 ? '' : ' even')}>
    {index}
  </div>;
renderItem.toJSON = () => renderItem.toString();

const renderSquareItem = (index, key) =>
  <div key={key} className={'square-item' + (index % 2 ? '' : ' even')}>
    {index}
  </div>;
renderSquareItem.toJSON = () => renderSquareItem.toString();

const getHeight = index => 30 + (10 * (index % 10));
getHeight.toJSON = () => getHeight.toString();

const getWidth = index => 100 + (10 * (index % 10));
getWidth.toJSON = () => getWidth.toString();

const renderVariableHeightItem = (index, key) =>
  <div
    key={key}
    className={'item' + (index % 2 ? '' : ' even')}
    style={{lineHeight: `${getHeight(index)}px`}}
  >
    {index}
  </div>;
renderVariableHeightItem.toJSON = () => renderVariableHeightItem.toString();

const renderVariableWidthItem = (index, key) =>
  <div
    key={key}
    className={'item' + (index % 2 ? '' : ' even')}
    style={{width: `${getWidth(index)}px`}}
  >
    {index}
  </div>;
renderVariableWidthItem.toJSON = () => renderVariableWidthItem.toString();

const renderGridLine = (row, key) =>
  <ReactList
    axis='x'
    key={key}
    length={10000}
    itemRenderer={
      (column, key) => renderSquareItem(column + (10000 * row), key)
    }
    type='uniform'
  />;
renderGridLine.toJSON = () => renderGridLine.toString();

let tbodyElem;
let reactListRef;
const getRef = (ref) => {
  tbodyElem = ref;
  reactListRef(ref);
};
const tbodyScrollParentGetter = () => tbodyElem;
tbodyScrollParentGetter.toJSON = tbodyScrollParentGetter.toString();

const renderTable = (items, ref, listPosition) => {
  reactListRef = ref;
  const {y, size} = listPosition;
  console.log('listPosition y', y, '/32', y / 32);
  return (<table className='example-table'>
    <thead>
      <tr><th>Fized Header Col 1</th><th>Fixed Header Col 2</th></tr>
    </thead>
    <tbody ref={getRef}>
      <tr aria-hidden style={{height: `${y}px`}} />
      {items}
      <tr aria-hidden style={{height: `${size - y}px`}} />
    </tbody>
  </table>);
};
renderTable.toJSON = () => renderTable.toString();
const renderTableItem = (index, key) =>
  <tr key={key} className={'item' + (index % 2 ? '' : ' even')}>
    <td>{index} col 1</td><td>{index} col 2</td>
  </tr>;
renderTableItem.toJSON = () => renderItem.toString();

const getItemsDOMNodes = () => Array.prototype.slice.call(tbodyElem.children, 1, -1);
getItemsDOMNodes.toJSON = getItemsDOMNodes.toString();

/*const renderVariableHeightTableItem = (index, key) =>
  <tr key={key}
    className={'item' + (index % 2 ? '' : ' even')}
    style={{height: `${getHeight(index)}px`}}>
    <td>{index} col 1</td><td>{index} col 2</td>
  </tr>;*/

const examples = [
  // {
  //   length: 10000,
  //   itemRenderer: renderVariableHeightTableItem,
  //   itemsRenderer: renderTable,
  //   scrollParentGetter: tbodyScrollParentGetter,
  //   type: 'variable',
  //   nonReactListProps: {
  //     componentClassName: 'table-component'
  //   }
  // },
  {
    length: 1000,
    itemRenderer: renderTableItem,
    itemsRenderer: renderTable,
    scrollParentGetter: tbodyScrollParentGetter,
    fixedHeaderTable: true,
    getItemsDOMNodes,
    useStaticSize: true,
    type: 'uniform',
    nonReactListProps: {
      componentClassName: 'table-component'
    }
  },
  {
    length: 10000,
    itemRenderer: renderTableItem,
    itemsRenderer: renderTable,
    scrollParentGetter: tbodyScrollParentGetter,
    nonReactListProps: {
      componentClassName: 'table-component'
    }
  },
  {
    length: 10000,
    itemRenderer: renderVariableHeightItem
  },
  {
    axis: 'x',
    length: 10000,
    itemRenderer: renderVariableWidthItem
  },
  {
    length: 10000,
    itemRenderer: renderVariableHeightItem,
    type: 'variable'
  },
  {
    axis: 'x',
    length: 10000,
    itemRenderer: renderVariableWidthItem,
    type: 'variable'
  },
  {
    length: 10000,
    itemRenderer: renderVariableHeightItem,
    itemSizeGetter: getHeight,
    type: 'variable'
  },
  {
    axis: 'x',
    length: 10000,
    itemRenderer: renderVariableWidthItem,
    itemSizeGetter: getWidth,
    threshold: 0,
    type: 'variable'
  },
  {
    length: 10000,
    initialIndex: 5000,
    itemRenderer: renderVariableHeightItem,
    itemSizeGetter: getHeight,
    type: 'variable'
  },
  {
    length: 10000,
    itemRenderer: renderItem,
    type: 'uniform'
  },
  {
    axis: 'x',
    length: 10000,
    itemRenderer: renderItem,
    type: 'uniform'
  },
  {
    length: 10000,
    itemRenderer: renderSquareItem,
    type: 'uniform'
  },
  {
    length: 10000,
    initialIndex: 5000,
    itemRenderer: renderItem,
    type: 'uniform'
  },
  {
    length: 10000,
    itemRenderer: renderGridLine,
    type: 'uniform',
    useTranslate3d: true
  }
];



export default class Root extends React.Component {
  renderExamples() {
    return examples.slice(0, 1).map((props, key) => {
      const {nonReactListProps, ...reactListProps} = props;
      const componentClassName =
        nonReactListProps && nonReactListProps.componentClassName ?
          nonReactListProps.componentClassName : 'component';
      return (<div key={key} className={`example axis-${props.axis}`}>
        <strong>Props</strong>
        <pre className='props'>{JSON.stringify(reactListProps, null, 2)}</pre>
        <strong>Component</strong>
        <div className={componentClassName}>
          <ReactList {...reactListProps} />
        </div>
      </div>);
    });
  }

  render() {
    return (
      <div className='index'>
        <a className='banner' href='https://github.com/orgsync/react-list'>
          <img
            src='https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67'
            alt='Fork me on GitHub'
          />
        </a>
        <div className='header'>ReactList</div>
        <div className='examples'>{this.renderExamples()}</div>
      </div>
    );
  }
}

window.addEventListener('load', () => ReactDOM.render(
  <Root />,
  document.getElementById('main')
));
