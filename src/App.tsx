import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-white m-0 p-0 box-border">
      <div className="w-[90%] mx-auto my-5">
        <h1 className="text-center text-black text-3xl font-serif tracking-wider">CODE EDITIOR</h1>
      </div>
      <CodeEditor />
    </div>
  );
}
export default App;
