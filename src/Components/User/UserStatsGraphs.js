import React from 'react';
import styles from './UserStatsGraphs.module.css';

//importamos os graficos que queremos usar
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

//data é um array de objetos com cada foto do usuario e seus acessos
const UserStatsGraphs = ({ data }) => {
  // Grafico reativo
  const [graph, setGraph] = React.useState([]);

  //Total de acessos reativo
  const [total, setTotal] = React.useState(0);


  React.useEffect(() => {
    if(data > 0){
      const graphData = data.map((item) => {
        return {
          x: item.title,
          y: Number(item.acessos)
        };
      });

      // Usamos o map e reducer para separar os acessos e somar todos os acessos da array

      setTotal(
        data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b)
      );

      setGraph(graphData);
    }
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>

      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2
            },
            labels: {
              fontSize: 14,
              fill: '#333'
            }
          }}
        />
      </div>

      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
