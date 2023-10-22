export const MachineRatingDetail = ({machine_rating}) => {
    const latest_rating = machine_rating[machine_rating.length - 1]
    return (
        <div>
            Machine Rating: {latest_rating.rating}
        </div>
    )
}