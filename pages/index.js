import Link from 'next/link';
import {Component} from 'react'

export default class extends Component {
    render() {
        return (
            <main>
                <h1>List of posts</h1>
                <Link href="/post" as="/fix-wordpress-admin-styles-not-loading">
                    <a>fix-wordpress-admin-styles-not-loading</a>
                </Link>
            </main>
        )
    }
}
