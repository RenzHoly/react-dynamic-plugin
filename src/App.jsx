import vendor from './vendor'

export default function App() {
  const [pluginName, setPluginName] = vendor.React.useState('')
  const [pluginRegistry, setPluginRegistry] = vendor.React.useState({})

  const loadPlugins = vendor.React.useCallback(() => {
    fetch('./dist/' + pluginName + '.plugin.js')
      .then((resp) => resp.text())
      .then((resp) => {
        setPluginRegistry((old) => ({
          ...old,
          [pluginName]: eval(resp).default,
        }))
      })
  }, [pluginName])

  return (
    <div>
      <h2>Dynamic Components Loading</h2>
      <input
        type="text"
        value={pluginName}
        onChange={(e) => setPluginName(e.target.value)}
        placeholder="Plugin Name D1,D2,...D4 etc"
      />
      <button onClick={loadPlugins}>Load</button>
      <div>
        {Object.entries(pluginRegistry).map(([componentId, Component]) => {
          return <Component key={componentId}>{componentId}</Component>
        })}
      </div>
    </div>
  )
}
