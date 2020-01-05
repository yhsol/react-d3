import React, { useRef, useEffect, useState } from "react";
import { select, line, curveLinear } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    // 여기서 Line 은 함수가 된다. 데이터에 기반해 path 엘리먼트의 d 속성을 생성한다.
    const Line = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveLinear);
    // svg
    // .selectAll("circle")
    // .data(data)
    // .join("circle")
    // .attr("r", value => value)
    // .attr("cx", value => value * 2)
    // .attr("cy", value => value * 2)
    // .attr("stroke", "blue");

    // 여기서 data([data]) 와 같이 array 에 담는 이유는 각 데이터마다의 path 를 생성할 것이 아니기 때문이다.
    // 하나의 path 에서 data 들을 그려낼 것이기 때문에 data 를 array 에 담아서 전달한다.

    // join("path") 는 각 데이터 entry 마다의 path 생성.
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      // 여기서 value 는 data 를 가져와서 쓰게 된다.
      .attr("d", value => Line(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <>
      <Wrapper ref={svgRef} />
      <button onClick={() => setData(data.map(value => value + 5))}>
        update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        filter data
      </button>
    </>
  );
}

export default App;
