
import { useState } from 'react';
import './App.css';


function App() {
  const [modOneActive, setModOneActive] = useState<boolean>(false);
  const [modTwoActive, setModTwoActive] = useState<boolean>(false);
  const [modThreeActive, setModThreeActive] = useState<boolean>(false);
  const [modMainActive, setModMainActive] = useState<boolean>(false);

  const buttonHandlers: { [key: string]: React.Dispatch<React.SetStateAction<boolean>> } = {
    AM: setModMainActive,
    Wave1: setModOneActive,
    Wave2: setModTwoActive,
    Wave3: setModThreeActive
  };

  const handleButtonClicked = (buttonName: string) => {
    const toggleFunction = buttonHandlers[buttonName];
    if (toggleFunction) {
      toggleFunction(prevState => !prevState);
    }
  };

  return (
    <>
      <ModulationControls
        handleButtonClicked={handleButtonClicked}
        modMainActive={modMainActive}
        modOneActive={modOneActive}
        modTwoActive={modTwoActive}
        modThreeActive={modThreeActive}
      />
      <main>
        <div className="page-content">
          <PageContainer />
        </div>
        <div className='wave-container'>
          <div className='wave'>
            <Wavy
              modMainActive={modMainActive}
              modOneActive={modOneActive}
              modTwoActive={modTwoActive}
              modThreeActive={modThreeActive}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
