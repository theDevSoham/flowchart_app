/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import classes from './styles/Diagrams.module.css';
import { Container } from '@chakra-ui/react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

const Shapes = [
	"Ellipse",
	"Rectangle",
	"RoundedRectangle",
	"Diamond"
];

const randomColor = () => {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const randomNumber = () => {
	return Math.floor(Date.now() + Math.random());
};

const DiagramsContainer = ({array}) => {

	const initiateColor = randomColor();
	const initiateNumber = randomNumber();

	const [nodeDataArray, setNodeDataArray] = React.useState([
		{ key: 0, text: 'Start', color: initiateColor, category: "initiate", loc: '0 0' },
		{ key: initiateNumber, text: 'Stop', color: initiateColor, category: "initiate", loc: '150 0' },
	]);

	const [linkDataArray, setLinkDataArray] = React.useState([
		{ key: -1, from: 0, to: initiateNumber },
	]);

	React.useEffect(() => {
		if(Array.isArray(array)){
			const newArray = array.map((item, index) => {
				return {
					key: index + 1,
					text: item.diagram_content,
					color: randomColor(),
					category: item.diagram_type,
					loc: `0 ${index + 150}`
				}
			});

			setNodeDataArray([nodeDataArray[0], ...newArray, nodeDataArray[1]]);
		}
	}, [array]);

	React.useEffect(() => {
		//console.log(nodeDataArray);

		const newLinkDataArray = nodeDataArray.map((item, index) => {

			if(index === nodeDataArray.length - 1){
				return null;
			}
			return {
				key: 0 - index - 1,
				from: item.key,
				to: nodeDataArray[index + 1]?.key,
			}
		});

		setLinkDataArray(newLinkDataArray);
	}, [nodeDataArray]);

	/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
	const $ = go.GraphObject.make;
	// set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
	const diagram =
	  $(go.Diagram,
		{
		  'undoManager.isEnabled': true,  // must be set to allow for model change listening
		  // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
		  'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
		  model: new go.GraphLinksModel(
			{
			  linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
			})
		});
  
	// define a simple Node template
	diagram.nodeTemplate =
	  $(go.Node, 'Auto',  // the Shape will go around the TextBlock
		new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
		$(go.Shape, Shapes[2],
		  { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
		  // Shape.fill is bound to Node.data.color
		  new go.Binding('fill', 'color')),
		$(go.TextBlock,
		  { margin: 8, editable: true },  // some room around the text
		  new go.Binding('text').makeTwoWay()
		)
	  );

	  const initiateTemplate = 
			$(go.Node, "Auto", 
				$(go.Shape, Shapes[0], { fill: "white", strokeWidth: 0 },
					new go.Binding("fill", "color")
				),

				$(go.TextBlock, "Auto", { margin: 8, editable: false }, 
					new go.Binding("text", "text")
				)
			);

		const inputTemplate = 
			$(go.Node, "Auto",
				$(go.Shape, Shapes[2], { fill: "white", strokeWidth: 0 },
					new go.Binding("fill", "color")
				),

				$(go.TextBlock, "Auto", { margin: 8, editable: false },
					new go.Binding("text", "text")
				)
			);
		
		const processTemplate = 
			$(go.Node, "Auto", 
				$(go.Shape, Shapes[1], { fill: "white", strokeWidth: 0 },
					new go.Binding("fill", "color")
				),

				$(go.TextBlock, "Auto", { margin: 8, editable: false },
					new go.Binding("text", "text")
				)
			);
		
		const decisionTemplate = 
			$(go.Node, "Auto",
				$(go.Shape, Shapes[3], { fill: "white", strokeWidth: 0 },
					new go.Binding("fill", "color")
				),

				$(go.TextBlock, "Auto", { margin: 8, editable: false },
					new go.Binding("text", "text")
				)
			);

		const templateMap = new go.Map();

		templateMap.add("initiate", initiateTemplate);
		templateMap.add("input", inputTemplate);
		templateMap.add("process", processTemplate);
		templateMap.add("decision", decisionTemplate);

		diagram.nodeTemplateMap = templateMap;

	return diagram;
  }
  
  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is dicussed below.
   */
  function handleModelChange(changes) {
	console.log('GoJS model changed!');
  }
  return (
	<Container width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
		<ReactDiagram
        initDiagram={initDiagram}
        divClassName={classes['diagram-component']}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        onModelChange={handleModelChange}
      />
	</Container>
  )
}

export default DiagramsContainer