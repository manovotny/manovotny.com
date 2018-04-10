const Post = ({url}) => {
    console.log('url', url);
    const file = `../posts${url.asPath}.mdx`;
    const Markdown = require(file);

    return (
        <Markdown/>
    );

    return (
        <p>{'Post!'}</p>
    )
};

export default Post;
