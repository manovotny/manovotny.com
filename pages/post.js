const Post = ({url}) => {
    const file = `../posts${url.asPath}.mdx`;
    const Markdown = require(`../posts${url.asPath}.mdx`).default;

    return (
        <Markdown />
    );
};

export default Post;
