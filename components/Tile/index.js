import React, { useState, useContext, useCallback } from "react";
import styles from "./style.module.css";
import gameContext from "../../context/gameContext";
import clickAdjacent from "../../funcs/clickAdjacent";

const Tile = ({ tile, row, column }) => {
  const { state, dispatch } = useContext(gameContext);
  const content = tile.content
  const [tileContent, setTileContent] = useState();

  function safeClick(row,column){
    dispatch({type:'increment',field:'clicks'})
    dispatch({type:"changeTile",row:row,column:column,status:"clicked"})
  }

  function reveal() {
    if (tile.status !== "unclicked") {
      return;
    }
    if (content === "M") {
      dispatch({ type: "gameOver" });
      return;
    }
    safeClick(row,column)
    if (content === 0){
      clickAdjacent(state.game,safeClick,row,column)
    }
    return;
  }

  function mark(e) {
    e.preventDefault();
    if (tile.status === "clicked") {
      return;
    }
    switch (tile.status) {
      case "unclicked":
        if(state.flagsLeft === 0){return}
        dispatch({type:"changeTile",row:row,column:column,status:"marked"});
        dispatch({ type: "decrement", field:'flagsLeft' });
        setTileContent("F");
        return;
      case "marked":
        dispatch({type:"changeTile",row:row,column:column,status:"unsure"});
        dispatch({ type: "increment", field:'flagsLeft' });
        setTileContent("?");
        return;
      case "unsure":
        dispatch({type:"changeTile",row:row,column:column,status:"unclicked"});
        setTileContent("");
        return;
      default:
        return;
    }
  }

  function getColour(content) {
    switch (content) {
      case 0:
        return { color: "aqua" };
      case 1:
        return { color: "#000" };
      case 2:
        return { color: "#909" };
      case 3:
        return { color: "#009" };
      case 4:
        return { color: "#090" };
      case 5:
        return { color: "#990" };
      case 6:
        return { color: "#940" };
      case 7:
        return { color: "#900" };
      case 8:
        return { color: "#904" };
      case "M":
        return { color: "#000" };
      default:
        console.log("Error");
    }
  }

  if (tile.status === "clicked"){
    return <div className={styles.tile} style={getColour(content)}>{content}</div>
  }
  else if (state.gameStatus !== "playing") {
    if (content === "M") {
      return <div className={styles.mine}>{content}</div>;
    } else {
      return <div className={styles.unclicked}></div>;
  } 
}else {
      return (
        <div
          className={styles.unclicked}
          onClick={() => {
            reveal();
          }}
          onContextMenu={(e) => {
            mark(e);
          }}
        >
          {tileContent}
        </div>
      );
    }
};

export default Tile;
