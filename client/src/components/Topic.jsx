import React from 'react';
const Topic = (props) => (
    <div>
        <div className="topic">
            <form onSubmit="">
                <div className="titleDiv">
                    <h3>Title</h3>
                    <input type="text" value="" onChange="" />
                </div>
                <div className="textDiv">
                    <h3>Text</h3>
                    <textarea value="" onChange="" />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
)
export default Topic;