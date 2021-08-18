/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import DataGrid, {
    Column,
    SearchPanel,
    Scrolling,
    Paging,
    Pager,
} from 'devextreme-react/data-grid';
import { Template } from 'devextreme-react/core/template';
import { Paper, Container, Grid, CircularProgress } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import 'devextreme/dist/css/dx.light.css';
import './ProjectsData.css';
import { HeadRow } from '../../Utils/models';
import { columns } from './CustomColumns';
import { selectGetProjectsState, selectProjectList } from '../../Redux/projects/projectsSelector';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../Redux/projects/projectsActions';
import { useEffect } from 'react';
import ComplexityFilter from '../../Elements/Projects/ComplexityFilter';

interface StateFromProps {
    projects: ReturnType<typeof selectGetProjectsState>;
}

type Props = StateFromProps;

const ProjectsData: React.FC<Props> = ({
    projects,
}) => {

    const dispatch = useDispatch();
    const allowedPageSizes = [10, 20, 50];
    const [filterByComplexity, setFilterByComplexity] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredProjects, setProjects] = useState(projects);
  
    useEffect(() => {
        dispatch(getProjects());
    }, []);
    
    const projectList = useSelector((rootState: any) => selectProjectList(rootState));
    
    useEffect(() => {
      setProjects(projectList.projects);
      setLoading(projectList.loading);
    }, [projectList])
  

  const renderComplexityFilter = () => (
    <ComplexityFilter                                               // filter for complexity, code in ComplexityFilter.tsx
        setFilterByComplexity={setFilterByComplexity}
        filterByComplexity={filterByComplexity}
        projects={projectList.projects}
        setProjects={setProjects}
    />
  );

  const renderResultsCounter = (e: any) => {                       // to display result counter 
    const resultsCount = e.component.totalCount();
    const recordsText = `Listing ${resultsCount} records`;
    
    return (
        <i>
            {resultsCount !== -1 && recordsText}
        </i>
    );
  };

  const onToolbarPreparing = (e: any) => {                           //  to render filter template abd result counter
      e.toolbarOptions.items.unshift(
      {
        location: 'before',
        template: 'complexityFilter'
      },
      {
        location: 'after',
        template: 'resultsCounter',
        component: e.component
      });
  };
 
  return (
      <>
        <Grid container className="grid-container" style={{ flexGrow: 1, margin: '30px', display: 'grid' }}>
            <Grid item className="grid-item"> 
                <CardHeader className="card-panel" title="Projects"/>
                <Container className="container">
                    <Paper className="paper-block" elevation={0} style={{ padding: 0 }}>
                        {loading ? (
                            <div className="loading-block">
                                <CircularProgress /> 
                            </div>
                           ) : (
                            <DataGrid
                                id='gridContainer'
                                dataSource={filteredProjects}
                                noDataText={'No data'}
                                showBorders={true}
                                showRowLines={true}
                                style={{ height: '100%' }}
                                className="freespaced-table"
                                // allowColumnReordering
                                onToolbarPreparing={onToolbarPreparing}     // to bind custom Template with datagrid
                                >
                                <Scrolling rowRenderingMode='virtual'></Scrolling>
                                <Paging defaultPageSize={20} />     
                                <Pager                            // for pagination information and to set default page size
                                    visible={true}
                                    allowedPageSizes={allowedPageSizes}
                                    displayMode='compact'
                                    showPageSizeSelector='true'
                                    showInfo='true'
                                    showNavigationButtons='true' 
                                />
                                {/* Template is for complexity filter and to show result count */}
                                <Template name="complexityFilter" render={renderComplexityFilter} /> 
                                <Template name="resultsCounter" render={(e: any) => renderResultsCounter(e)} /> 
                                <SearchPanel visible placeholder='Search...' />
                                {columns
                                    .map((item: HeadRow) => (
                                    <Column
                                        key={item.id}
                                        dataField={item.id}
                                        caption={item.caption}
                                        dataType={item.datatype}
                                        cellRender={item.render}
                                        width={`${item.width}%`}
                                        allowSorting={item.allowSorting}
                                        defaultSortOrder={item.defaultSortOrder}
                                    />
                                    ))}
                            </DataGrid>
                            )
                        }
                    </Paper>
                </Container>
            </Grid>
        </Grid>
      </>
  )
};


function mapStateToProps(state: any): StateFromProps {
    return {
        projects: selectGetProjectsState(state)
    };
}
  
export default connect<StateFromProps>(
    mapStateToProps
)(ProjectsData);