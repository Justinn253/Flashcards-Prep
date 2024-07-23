

const SideBar = ({questions, nav}: any) => {

  return(
    <div className='sidebar-container'>
      <div className='sidebar-title'>
        Table of Contents
      </div>
      <div className='sidebar-content'>
        {questions.map((item: any) => {
          return (
            <div className='sidebar-item' key={item.id} onClick={() => nav(item.id)}>
              <div>{item.title}</div> 
              <div>{item.id}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar;