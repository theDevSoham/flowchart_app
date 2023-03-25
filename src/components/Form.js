import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const additionSchema = [
  {
    diagram_type: "input",
    diagram_content: "x=1; \n y=2;",
  },

  {
    diagram_type: "process",
    diagram_content: "c = x + y",
  },

  {
    diagram_type: "decision",
    diagram_content: "is c > 0 and c == 3 ?",
  },
];

const subtractionSchema = [
  {
    diagram_type: "input",
    diagram_content: "x=1; \n y=2;",
  },

  {
    diagram_type: "process",
    diagram_content: "c = x - y",
  },

  {
    diagram_type: "decision",
    diagram_content: "is c < 0 and c == -1 ?",
  },
];

const multiplySchema = [
  {
    diagram_type: "input",
    diagram_content: "x=1; \n y=2;",
  },

  {
    diagram_type: "process",
    diagram_content: "c = x * y",
  },

  {
    diagram_type: "decision",
    diagram_content: "is c > 0 and c == 2 ?",
  },
];

const divisionSchema = [
  {
    diagram_type: "input",
    diagram_content: "x=1; \n y=2;",
  },

  {
    diagram_type: "process",
    diagram_content: "c = x / y",
  },

  {
    diagram_type: "decision",
    diagram_content: "is c > 0 and c == 0.5 ?",
  },
];

const defaults = [
  {
    title: "addition",
    schema: additionSchema,
  },

  {
    title: "subtraction",
    schema: subtractionSchema,
  },

  {
    title: "multiply",
    schema: multiplySchema,
  },

  {
    title: "division",
    schema: divisionSchema,
  },
];

const Form = () => {
  const [flowchartSchema, setFlowchartSchema] = React.useState(additionSchema);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const addInput = () => {
    setFlowchartSchema([
      ...flowchartSchema,
      { diagram_type: "input", diagram_content: "" },
    ]);
  };

  const addProcess = () => {
    setFlowchartSchema([
      ...flowchartSchema,
      { diagram_type: "process", diagram_content: "" },
    ]);
  };

  const addDecision = () => {
    setFlowchartSchema([
      ...flowchartSchema,
      { diagram_type: "decision", diagram_content: "" },
    ]);
  };

  const changeDiagramContent = (e, index) => {
    const { value } = e.target;
    setFlowchartSchema(
      flowchartSchema.map((item, i) => {
        if (i === index) {
          return { ...item, diagram_content: value };
        }
        return item;
      })
    );
  };

  //   const submitData = () => {
  // 	//console.log(flowchartSchema);
  // 	navigate("/diagram", { schema: flowchartSchema });
  //   };

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading>Form</Heading>

      <FormControl>
        {flowchartSchema.map((item, index) => {
          return (
            <Container key={index}>
              <FormLabel>{capitalizeFirstLetter(item.diagram_type)}</FormLabel>
              <Input
                type="text"
                value={item.diagram_content}
                onChange={(e) => changeDiagramContent(e, index)}
              />
            </Container>
          );
        })}

        <Container
          width="100%"
          marginTop="30px"
          display="flex"
          justifyContent="center"
        >
          <Link to="/diagram" state={{ schema: flowchartSchema }}>
            <Button colorScheme="teal" variant="solid" size="lg">
              <Text>Submit</Text>
            </Button>
          </Link>
        </Container>
      </FormControl>

      <Container my="30px" display="flex" justifyContent="space-around">
        <Button colorScheme="teal" variant="solid" size="lg" onClick={addInput}>
          <Text>Add Input</Text>
        </Button>
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          onClick={addProcess}
        >
          <Text>Add Process</Text>
        </Button>
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          onClick={addDecision}
        >
          <Text>Add Decision</Text>
        </Button>
      </Container>

      <Container my="30px">
        <Heading>Some pre built flowcharts</Heading>

        <Container
          my="30px"
          display="grid"
          gridTemplateColumns="2fr 2fr 2fr"
          gap="30px"
        >
          {defaults.map((item, index) => {
            return (
              <Link to="/diagram" state={{ schema: item.schema }} key={index}>
                <Button colorScheme="teal" variant="solid" size="lg">
                  <Text>{item.title}</Text>
                </Button>
              </Link>
            );
          })}
        </Container>
      </Container>
    </Container>
  );
};

export default Form;
