import React from 'react';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };
  }
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerStart,
      timerStart: Date.now() - this.state.timerTime,
    });
    !this.state.timerOn &&
      (this.timer = setInterval(() => {
        this.setState({
          timerTime: Date.now() - this.state.timerStart,
        });
      }, 10));
  };

  stopTimer = () => {
    this.setState({
      timerOn: false,
    });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <>
        <div className="w-4/12 border-2 px-10 relative p-5 bg-white rounded  ml-10">
          <h1 className="bg-white mt-20 text-green-600 text-3xl font-bold my-6  text-center">
            Stopwatch
          </h1>

          <div className="m-auto w-9/12  flex items-center text-3xl text-center font-bold">
            <div className="flex items-center m-auto">
              <h2 className="bg-white text-blue-600 text-3xl font-bold my-6  text-center">
                {hours}
              </h2>
              <h3 className="mx-5">:</h3>
              <h2 className="bg-white text-blue-600 text-3xl font-bold my-6  text-center">
                {minutes}
              </h2>
              <h3 className="mx-5">:</h3>
              <h2 className="bg-white text-blue-600 text-3xl font-bold my-6  text-center">
                {seconds}
              </h2>
              <h3 className="mx-5">:</h3>
              <h2 className="bg-white text-blue-600 text-3xl font-bold my-6  text-center">
                {centiseconds}
              </h2>
            </div>
          </div>
          <div className="flex justify-center">
            {this.state.timerOn === false && this.state.timerTime === 0 && (
              <button
                onClick={this.startTimer}
                className="bg-green-600 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
              >
                Start
              </button>
            )}
            {this.state.timerOn === true && (
              <button
                onClick={this.stopTimer}
                className="bg-green-600 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
              >
                Stop
              </button>
            )}
            {this.state.timerOn === false && this.state.timerTime > 0 && (
              <button
                onClick={this.startTimer}
                className="bg-green-600 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
              >
                Resume
              </button>
            )}
            {this.state.timerOn === false && this.state.timerTime > 0 && (
              <button
                onClick={this.resetTimer}
                className="bg-green-600 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Stopwatch;
