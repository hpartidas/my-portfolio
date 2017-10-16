import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './components/example-work';

const myWork = [
    {
        'title': "Work Example",
        'href': "https://example.com",
        'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur corporis cum cupiditate deserunt dignissimos eius ex harum ipsum, labore maiores, minima nesciunt officia perferendis quasi qui quidem sunt voluptatibus!",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    {
        'title': "Work Example",
        'href': "https://example.com",
        'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur corporis cum cupiditate deserunt dignissimos eius ex harum ipsum, labore maiores, minima nesciunt officia perferendis quasi qui quidem sunt voluptatibus!",
        'image': {
            'desc': "example screenshot of a project involving chemistry",
            'src': "images/example2.png",
            'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
           https://www.flickr.com/photos/ssoosay/4097410999`
        }
    },
    {
        'title': "Work Example",
        'href': "https://example.com",
        'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur corporis cum cupiditate deserunt dignissimos eius ex harum ipsum, labore maiores, minima nesciunt officia perferendis quasi qui quidem sunt voluptatibus!",
        'image': {
            'desc': "example screenshot of a project involving cats",
            'src': "images/example3.png",
            'comment': `“Bengal cat” by roberto shabs is licensed under CC BY 2.0
           https://www.flickr.com/photos/37287295@N00/2540855181`
        }
    }
];

ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'));
