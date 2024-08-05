import './SideBar.css';

const SideBar = ({pQuestions, pNav, pCurrentIndex}: any) => {

  return(
    <div className='sidebar-container'>
      <div className='sidebar-title'>
        Table of Contents
      </div>
      <div className='sidebar-content'>
        {pQuestions.map((item: any, i: number) => {
          return (
            <div className={pCurrentIndex == i ? 'sidebar-current-item' : 'sidebar-item'} key={item.id} onClick={() => pNav(i + 1)}>
              <div><b>({item.knowledgeLevel})</b> {item.title}</div> 
              <div>{i + 1}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar;