import Link from 'next/link';
import {Component} from 'react';

export default class extends Component {
    render() {
        return (
            <main>
                <h1>{this.props.url.asPath}</h1>
                <Link href='/'>
                    <a>Go back to home</a>
                </Link>
            </main>
        )
    }
}
