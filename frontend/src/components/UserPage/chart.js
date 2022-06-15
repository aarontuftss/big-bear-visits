import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

function Chart({properties}){
    const data = properties.map(p => {
        return [p.name, p.profit]
    })
    //.sort((a, b) => a[1] - b[1])




    return (
        <>
        <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={25}
        domain={{y:[0, 10000]}}
        width={700}
        margin={50}
        >
            <VictoryBar 
                    style={{ data: { fill: '#c43a31'}}}
                    data={properties.map(p => {return {x: p.name, y: p.profit}})}
                    labels={data.map(d=>{return d[1]})}
            />
        </VictoryChart>
        </>
    )
}

export default Chart