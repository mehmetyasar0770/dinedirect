import { Button, Tabs } from "antd"



function App() {
 

  return (
    <>
      <Button className="hidden"> Klikle </Button>
      <Tabs >
        <Tabs.TabPane tab="Tab1" key="1">
          <div> Tab 1</div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab2" key="2">
          <div> Tab 2</div>
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default App
