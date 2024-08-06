import project from "@/../package.json"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const VersionProvider = () => {
    return (
        <h1 className="fixed bottom-1 left-2 text-secondary text-sm">
            LaserTag v{project.version} - J4C0B3Y
        </h1>
    )
}

export default VersionProvider