import { withStyles } from 'arwes';

const styles = () => ({
    root: {
        margin : '0 auto',
        maxWidth: 800,
        paddingLeft: 10,
        paddingRight: 10
    }
})

const Centered = props => {
    const {
        classes,
        className,
        children,
        ...rest
    } = props;
    
    return (
        <div className={`${classes.root} ${className}`} {...rest}>
            {children}
        </div>
    )
}

export default withStyles(styles)(Centered)