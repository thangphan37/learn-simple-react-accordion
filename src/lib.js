import styled from '@emotion/styled';
import posed from 'react-pose';
import {jsx} from '@emotion/core'
/** @jsx jsx */

const AccordionItem = styled('div')(
  {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplate: 'auto auto',
    gridGap: 4
  },
  props => ({
    gridAutoFlow: props.direction === 'horizontal' ? 'column' : 'row'
  })
);

const PosedAccordionContents = posed.div({
  open: {maxHeight: 200},
  closed: {maxHeight: 0},
});

const AccordionButton = styled('button')(
  {
    border: 'none',
    minWidth: 80,
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    cursor: 'pointer',
    background: 'unset', ':focus':({
      backgroundColor: 'rgba(255,255,255,0.4)'
    })
  },
  props => ({
    outline: 'none',
    backgroundColor: props.isOpen ? 'rgba(255,255,255,0.2)' : null
  })
);

const TabItems = styled('div')(
  {
    position: 'relative',
    minHeight: 120
  }
);

const AboveItem = posed.div({
  open: {opacity: 1, bottom: 0},
  closed: {opacity: 0, bottom: 30},
});

const BelowItem = posed.div({
  open: {opacity: 1, top: 0},
  closed: {opacity: 0, top: 30},
});

function TabItem({isOpen, postion, ...props}) {
  props = {
    pose: isOpen ? 'open' : 'closed',
    css: {position: 'absolute', overflowY: 'hidden'},
    ...props
  }

  return postion === 'above' ? <AboveItem {...props}/> : <BelowItem {...props}/> 

}

const TabButtons = styled('div')(
  {
    display: 'flex'
  }
);

const TabButton = styled(AccordionButton)(
  {
    textAlign: 'center'
  }
)

function AccordionContents({isOpen, ...props}) {
  return <PosedAccordionContents 
          pose={isOpen ? 'open' : 'closed'} 
          css={{overflowY: 'hidden', textAlign: 'justify'}}
          {...props}
          />
}



export {
  AccordionItem,
  AccordionContents,
  AccordionButton,
  TabItems,
  TabItem,
  TabButtons,
  TabButton
}