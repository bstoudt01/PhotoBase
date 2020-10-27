// import React from "react";
// import ReactDOM from "react-dom";
// import Modal from "react-bootstrap/Modal";
// import ModalBody from "react-bootstrap/ModalBody";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

// const MyModal = () => {
//     const [isOpen, setIsOpen] = React.useState(false);

//     const showModal = () => {
//         setIsOpen(true);
//     };

//     const hideModal = () => {
//         setIsOpen(false);
//     };
//     return (
//         <>
//             <button onClick={showModal}>Display Modal</button>
//             <Modal show={isOpen} onHide={hideModal}>
//                 <ModalHeader>
//                     <ModalTitle>Hi</ModalTitle>
//                 </ModalHeader>
//                 <ModalBody>asdfasdf</ModalBody>
//                 <ModalFooter>This is the footer
//                 <button onClick={hideModal}>Cancel</button>
//                     <button>Save</button>
//                 </ModalFooter>

//             </Modal>
//         </>
//     );
// };
// const rootElement = document.getElementById("root");
// ReactDOM.render(<MyModal />, rootElement);

// export default MyModal;