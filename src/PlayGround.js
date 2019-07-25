// import React, { useState } from "react";
// import { render } from "react-dom";
// import { Form as FinalForm, Field } from "react-final-form";
// import arrayMutators from "final-form-arrays";
// import { FieldArray } from "react-final-form-arrays";
// import { Form, Button, ButtonGroup, Row, Col } from "react-bootstrap";

// import { Dropdown } from "./Dropdown";
// import { wordTypes } from "./wordTypes";

// const GeneratorForm = () => {
//   const [submittedData, setSubmittedData] = useState({});

//   const generate = (formValues = []) => {
//     setSubmittedData(formValues);
//   };

//   return (
//     <div>
//       <FinalForm
//         onSubmit={e => generate(e)}
//         initialValues={{ dynamic_word_types: [wordTypes[0].smokes[0], wordTypes[0].smokes[1]] }}
//         keepDirtyOnReinitialize={true}
//         mutators={{
//           ...arrayMutators
//         }}
//         render={({
//           form: {
//             mutators: { push, pop }
//           },
//           handleSubmit,
//           pristine,
//           values
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <FieldArray name="dynamic_word_types">
//                 {({ fields }) => 
//                   fields.map((name, index) => {
//                     console.log("11111111", fields.initial[index]);
//                    // console.log("2222222", index);
//                     return (
//                       <Col md={2} key={name}>
//                         <Field
//                           validate={value => (value ? undefined : "Required")}
//                           name={`${name}`}
//                           label="Word Type"
//                           render={({ input }) => (
//                             <div>
                              
//                               <input
                               
//                                value={ fields.initial[index].place}
//                               />
//                             </div>
//                           )}
//                         />
//                         <Field
//                           validate={value => (value ? undefined : "Required")}
//                           name={`${name}`}
//                           label="Word Type"
//                           render={({ input }) => (
//                             <div>
                              
//                               <input
                               
//                             value={ fields.initial[index].reason}
//                               />
//                             </div>
//                           )}
//                         />
//                         <br/>
//                       </Col>
//                     );
//                   })
//                 }
//               </FieldArray>
//             </Row>
//             <br />
//             <Row className="mb-3">
//               <Col md={2}>
//                 <ButtonGroup>
//                   <Button
//                     variant="outline-success"
//                     onClick={() => push("dynamic_word_types")}
//                   >
//                     Add
//                   </Button>
//                   <Button
//                     variant="outline-danger"
//                     onClick={() => pop("dynamic_word_types")}
//                   >
//                     Remove
//                   </Button>
//                 </ButtonGroup>
//               </Col>
//               <Col md={2}>
//                 <ButtonGroup>
//                   <Button variant="success" type="submit">
//                     Generate
//                   </Button>
//                   <Button
//                     variant="primary"
//                     onClick={() => {
//                       for (
//                         var i = 1;
//                         i < values.dynamic_word_types.length;
//                         i++
//                       ) {
//                         pop("dynamic_word_types");
//                       }
//                     }}
//                     disabled={pristine}
//                   >
//                     Reset
//                   </Button>
//                 </ButtonGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col sm={12}>
//                 <h4> Final Form Data </h4>
//                 <pre>{JSON.stringify(values, 0, 2)}</pre>
//               </Col>
//             </Row>
//             <Row>
//               <Col sm={12}>
//                 <h4> Submitted Data </h4>
//                 <pre>{JSON.stringify(submittedData, 0, 2)}</pre>
//               </Col>
//             </Row>
//           </Form>
//         )}
//       />
//     </div>
//   );
// };

// render(<GeneratorForm />, document.getElementById("root"));
