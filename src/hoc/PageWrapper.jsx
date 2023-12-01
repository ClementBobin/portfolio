const PageWrapper = (Component) => 
function HOC() {
  return (
    <section className='sec'>
        <div className='blockCustom'>
            <div className='tile'>
                <Component />
            </div>
        </div>
    </section>
  )
}

export default PageWrapper