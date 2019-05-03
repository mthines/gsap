import React, { Component, createRef } from "react";
import { TimelineMax, Power2 } from "gsap";
import Spinner from "assets/icons/spinner.svg";

import styles from "./frontpage.module.scss";

class Frontpage extends Component {
  tlIntro = new TimelineMax({ paused: true });
  spinner = createRef();
  title = createRef();
  titleLetters;
  state = {
    tlIntroRunning: false,
    tlIntroDirection: false,
    tlIntroTimescale: 1,
  };

  componentDidMount = () => {
    const { current: title } = this.title;
    this.titleLetters = Array.of(...title.children);

    // Timeline
    this.introReset();
    this.introPlay();
  };

  introReset = () => {
    const { current: spinner } = this.spinner;
    const { current: title } = this.title;
    this.tlIntro
      .set(spinner, { autoAlpha: 0 })
      .set(title, { className: `-=${styles.titleFinish}` })
      .set(this.titleLetters, { autoAlpha: 0 });
  };

  toggleAnimation = () => {
    const { tlIntroRunning } = this.state;

    if (tlIntroRunning) {
      this.tlIntro.pause();
      this.tlIntro.time(0);
    } else {
      this.tlIntro.play();
    }

    this.setState({
      tlIntroRunning: !tlIntroRunning,
    });
  };

  reverse = () => {
    const { tlIntroDirection } = this.state;

    if (tlIntroDirection) {
      this.tlIntro.reverse();
    } else {
      this.tlIntro.play();
    }

    this.setState({
      tlIntroDirection: !tlIntroDirection,
    });
  };

  changeTimeScale = e => {
    const timeScale = e.target.value / 10;
    this.tlIntro.timeScale(timeScale);

    this.setState({
      tlIntroTimescale: timeScale,
    });
  };

  introPlay = () => {
    const { current: spinner } = this.spinner;
    const { current: title } = this.title;

    const titleBlack = [...this.titleLetters].splice(0, 5);
    const titleMirror = [...this.titleLetters].splice(6, 6);

    this.tlIntro
      .add("spinner")
      .to(spinner, 0.5, {
        autoAlpha: 1,
        ease: Power2.easeInOut,
      })
      .to(spinner, 2, { autoAlpha: 1 }, "+=0.2")
      .to(
        spinner,
        0.3,
        { autoAlpha: 0, yoyo: true, repeat: 2, ease: Power2.easeInOut },
        "+=0.2"
      )
      .to(spinner, 1, { autoAlpha: 0 }, "+=0")
      .add("letters")
      .staggerFromTo(titleBlack, 0.3, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.2)
      .to(
        this.titleLetters[4],
        0.1,
        {
          autoAlpha: 1,
          repeat: 3,
          yoyo: true,
          ease: Power2.easeInOut,
        },
        "letters+=0.1"
      )
      .to(this.titleLetters[4], 0.15, { autoAlpha: 0 })
      .to(
        this.titleLetters[7],
        0.15,
        {
          autoAlpha: 1,
          repeat: 2,
          yoyo: true,
          ease: Power2.easeInOut,
        },
        "letters"
      )
      .to(this.titleLetters[7], 0.15, { autoAlpha: 0 })
      .to(
        this.titleLetters[9],
        0.15,
        {
          autoAlpha: 1,
          repeat: 2,
          yoyo: true,
          ease: Power2.easeInOut,
        },
        "letters+=0.2"
      )
      .to(this.titleLetters[9], 0.15, { autoAlpha: 0 })
      .staggerTo(titleBlack, 0.15, { autoAlpha: 0 }, 0.05)
      .to(this.titleLetters[0], 0.15, {
        autoAlpha: 1,
        repeat: 5,
        yoyo: true,
        ease: Power2.easeInOut,
      })
      .to(
        this.titleLetters[4],
        0.2,
        {
          autoAlpha: 1,
          repeat: 3,
          yoyo: true,
          ease: Power2.easeInOut,
        },
        "-=0.2"
      )
      .to(this.titleLetters[7], 1.25, { autoAlpha: 0 })
      .staggerTo(titleBlack, 0.5, { autoAlpha: 1 }, 0.3)
      .staggerTo(titleMirror, 0.4, { autoAlpha: 1 }, 0.2)
      .add("blur")
      .set(title, { className: `+=${styles.titleFinish}` });
  };

  render() {
    const { tlIntroRunning, tlIntroTimescale, tlIntroDirection } = this.state;
    return (
      <div className={styles.base}>
        <header className={styles.top}>
          <button
            className={styles.topButton}
            type="button"
            onClick={this.toggleAnimation}
          >
            {tlIntroRunning ? "⏹ Stop and reset" : "⏯ Start animation"}
          </button>
          <button
            className={styles.topButton}
            type="button"
            onClick={this.reverse}
          >
            {tlIntroDirection ? "Play forward" : "Play in reverse"}
          </button>
          <label>Tempo: {tlIntroTimescale}</label>
          <input
            type="range"
            min="0"
            max="20"
            defaultValue="10"
            onChange={this.changeTimeScale}
          />
        </header>

        <main className={styles.wrapper}>
          <div className={styles.spinner} ref={this.spinner}>
            <Spinner />
          </div>

          <h1 ref={this.title} className={styles.title}>
            <span className={styles.titleLetter}>B</span>
            <span className={styles.titleLetter}>L</span>
            <span className={styles.titleLetter}>A</span>
            <span className={styles.titleLetter}>C</span>
            <span className={styles.titleLetter}>K</span>
            <span className={styles.titleLetter}> </span>
            <span className={styles.titleLetter}>M</span>
            <span className={styles.titleLetter}>I</span>
            <span className={styles.titleLetter}>R</span>
            <span className={styles.titleLetter}>R</span>
            <span className={styles.titleLetter}>O</span>
            <span className={styles.titleLetter}>R</span>
          </h1>
        </main>
      </div>
    );
  }
}

export default Frontpage;
