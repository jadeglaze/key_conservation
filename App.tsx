/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';

type Player = 'X' | 'O' | null;
type Board = (Player)[];

interface GameHistory {
  board: Board;
  winner: Player | 'Draw';
  date: string;
}

const App = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  const calculateWinner = (squares: Board): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handlePress = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
      setGameHistory(prev => [
        {
          board: [...board],
          winner: result,
          date: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const getBoardSize = () => {
    if (isLandscape) {
      return Math.min(height * 0.7, 500);
    }
    return Math.min(width * 0.8, 300);
  };

  const getHistoryBoardSize = () => {
    if (isLandscape) {
      return Math.min(height * 0.35, 200);
    }
    return Math.min(width * 0.5, 150);
  };

  const renderSquare = (index: number) => {
    const boardSize = getBoardSize();
    const padding = 12; // Reduced from 20 to 12
    const gap = 8; // Reduced from 10 to 8
    const squareSize = (boardSize - (padding * 2) - (gap * 2)) / 3;
    return (
      <TouchableOpacity
        style={[styles.square, {width: squareSize, height: squareSize}]}
        onPress={() => handlePress(index)}>
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const renderHistoryBoard = (historyBoard: Board) => {
    const boardSize = getHistoryBoardSize();
    const squareSize = (boardSize - 20) / 3; // Subtracting padding and margins
    return (
      <View style={[styles.historyBoard, {width: boardSize}]}>
        <View style={styles.historyRow}>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[0]}</Text>
          </View>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[1]}</Text>
          </View>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[2]}</Text>
          </View>
        </View>
        <View style={styles.historyRow}>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[3]}</Text>
          </View>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[4]}</Text>
          </View>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[5]}</Text>
          </View>
        </View>
        <View style={styles.historyRow}>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[6]}</Text>
          </View>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[7]}</Text>
          </View>
          <View style={[styles.historySquare, {width: squareSize, height: squareSize}]}>
            <Text style={styles.historySquareText}>{historyBoard[8]}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={[
        styles.title,
        isLandscape && styles.titleLandscape,
      ]}>Tic Tac Toe</Text>

      <View style={[
        styles.contentContainer,
        isLandscape && styles.contentContainerLandscape,
      ]}>
        <View style={[
          styles.gameContainer,
          isLandscape && styles.gameContainerLandscape,
        ]}>
          <View style={[styles.board, {width: getBoardSize()}]}>
            <View style={styles.row}>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </View>
            <View style={styles.row}>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </View>
            <View style={styles.row}>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </View>
          </View>

          <Text style={[
            styles.status,
            isLandscape && styles.statusLandscape,
          ]}>
            {winner
              ? winner === 'Draw'
                ? "It's a Draw!"
                : `Player ${winner} Wins!`
              : `Next Player: ${currentPlayer}`}
          </Text>

          {winner && (
            <TouchableOpacity style={[
              styles.button,
              isLandscape && styles.buttonLandscape,
            ]} onPress={resetGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[
          styles.historySection,
          isLandscape && styles.historySectionLandscape,
        ]}>
          <Text style={styles.historyTitle}>Game History</Text>
          <View style={styles.historyWrapper}>
            <ScrollView 
              style={[
                styles.historyContainer,
                isLandscape && styles.historyContainerLandscape,
              ]}
              contentContainerStyle={styles.historyContentContainer}>
              {gameHistory.map((game, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyText}>
                    {game.winner === 'Draw'
                      ? 'Game ended in a Draw'
                      : `Player ${game.winner} won`}
                  </Text>
                  <Text style={styles.historyDate}>{game.date}</Text>
                  {renderHistoryBoard(game.board)}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
  },
  contentContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  gameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  gameContainerLandscape: {
    flex: 1,
    maxWidth: '50%',
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 12,
    textAlign: 'center',
  },
  titleLandscape: {
    fontSize: 24,
    marginVertical: 8,
  },
  board: {
    aspectRatio: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '31%',
  },
  square: {
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  squareText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  statusLandscape: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonLandscape: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historySection: {
    width: '100%',
    flex: 1,
  },
  historySectionLandscape: {
    flex: 1,
    maxWidth: '50%',
    paddingLeft: 20,
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  historyContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  historyContainerLandscape: {
    paddingHorizontal: 10,
  },
  historyContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDate: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  historyBoard: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    alignSelf: 'center',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  historySquare: {
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: 2,
  },
  historySquareText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  historyWrapper: {
    flex: 1,
  },
});

export default App;
