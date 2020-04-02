import React from 'react';

export const About = () => (
    <div className="body">
        <div className="About">
            <p className="About__p">"The Monty Hall problem is a brain teaser, in the form of a probability puzzle,
        loosely based on the American television game show Let's Make a Deal and named after
        its original host, Monty Hall. The problem was originally posed (and solved)
        in a letter by Steve Selvin to the American Statistician in 1975 (Selvin 1975a),
        (Selvin 1975b). It became famous as a question from a reader's letter quoted in
        Marilyn vos Savant's
        "Ask Marilyn" column in Parade magazine in 1990 (vos Savant 1990a):</p>
            <p className="About__p-mid">Suppose you're on a game show, and you're given the choice of three doors:
             Behind one door is a car; behind the others, goats. You pick a door, say No. 1,
              and the host, who knows what's behind the doors, opens another door, say No. 3,
               which has a goat. He then says to you, "Do you want to pick door No. 2?"
                Is it to your advantage to switch your choice?</p>
            <p className="About__p">Vos Savant's response was that the contestant should switch to the other door
         (vos Savant 1990a). Under the standard assumptions, contestants who switch have
          a 2/3 chance of winning the car, while contestants who stick to their initial
           choice have only a 1/3chance."</p>
            <p className="About__p-source"><a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">from Wikipedia</a></p>
        </div>
    </div>
);
