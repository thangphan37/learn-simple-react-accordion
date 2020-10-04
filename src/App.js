import React from 'react';
import './App.css';
import {
  AccordionItem,
  AccordionContents,
  AccordionButton,
  TabItems,
  TabItem,
  TabButtons,
  TabButton
} from './lib';

const items = [
  {
    title: '🐴',
    contents: (
      <div>
        Horses can sleep both lying down and standing up. Domestic horses have a
        lifespan of around 25 years. A 19th century horse named 'Old Billy' is
        said to have lived 62 years.
      </div>
    )
  },
  {
    title: '🦏',
    contents: (
      <div>
        Rhino skin maybe thick but it can be quite sensitive to sunburns and
        insect bites which is why they like wallow so much – when the mud dries
        it acts as protection from the sunburns and insects.
      </div>
    )
  },
  {
    title: '🦄',
    contents: (
      <div>
        If you’re looking to hunt a unicorn, but don’t know where to begin, try
        Lake Superior State University in Sault Ste. Marie, Michigan. Since
        1971, the university has issued permits to unicorn questers.
      </div>
    )
  }
];

const actionTypes = {toggle_index: 'toggle_index'};

function accordionReducer(openIndexes, action) {
  switch(action.type) {
    case actionTypes.toggle_index:
      const closing = openIndexes.includes(action.index);

      return closing ? openIndexes.filter(f => f!= action.index) : [...openIndexes, action.index];
    default: 
      throw new Error(`Unhandled toggle accordionReducer with: ${action.type}`);
  }
}

function combineReducer(...reducers) {
  return (state, action) => {
    for(const reducer of reducers) {
      const result = reducer(state, action);

      if(result) {
        return result;
      }
    }
  }
}

function useAccordion({reducer = accordionReducer}) {
  const [openIndexes, dispatch] = React.useReducer(reducer, [0]);
  const toggleIndex = (index) => dispatch({type: actionTypes.toggle_index, index});

  return {openIndexes, toggleIndex};
}

function Accordion({items}) {
  const {openIndexes, toggleIndex} = useAccordion({
    reducer: combineReducer(accordionReducer)
  });

  return(
    <div>
      {
        items.map((item, index) => (
          <AccordionItem key={item.title}>
            <AccordionContents isOpen={openIndexes.includes(index)}>
              {item.contents}
            </AccordionContents>
            <AccordionButton isOpen={openIndexes.includes(index)} onClick={() => toggleIndex(index)}>
              {item.title}{'  '}
              <span>{openIndexes.includes(index) ? '👇' : '👈'}</span>
            </AccordionButton>
          </AccordionItem>
        ))
      }
    </div>
  )
}

function preventAccordionReducer(openIndexes, action) {
  if(action.type === actionTypes.toggle_index) {
    const closing = openIndexes.includes(action.index);
    const isLast = openIndexes.length < 2;

    if(isLast && closing) {
      return openIndexes;
    }
  }
}

function singleAccordionReducer(openIndexes, action) {
  if(action.type === actionTypes.toggle_index) {
    const closing = openIndexes.includes(action.index);

    if(!closing) {
      return [action.index];
    }
  }
}

function useTabs({reducer = () => {}} = {}) {
  return useAccordion({
    reducer: combineReducer(reducer, preventAccordionReducer, singleAccordionReducer, accordionReducer)
  })
}

function Tabs({items}) {
  const {openIndexes, toggleIndex} = useTabs();

  return(
    <div>
      <TabItems>
        {
          items.map((item, index) => (
            <TabItem key={index} isOpen={openIndexes.includes(index)}>
              {item.contents}
            </TabItem>
          ))
        }
      </TabItems>
      <TabButtons>
        {
          items.map((item, index) => (
            <TabButton key={item.title} isOpen={openIndexes.includes(index)} onClick={() => toggleIndex(index)}>
              {item.title}
            </TabButton>
          ))
        }
      </TabButtons>
    </div>
  )
}

function App() {
  return(
    <div
      style={{
        maxWidth: 400,
        marginTop: 60,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Accordion items={items}/>
        <hr />
        <Tabs items={items}/>
    </div>
  )
}
export default App;
