import styled from "styled-components";
const Loader = styled.div`
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid black; /* Blue */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
